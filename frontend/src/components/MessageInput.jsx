import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Image, Send, X, Loader2 } from "lucide-react";

function MessageInput() {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  // ✅ Zustand store
  const { sendMessage, isUploading } = useChatStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ size limit
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File too large (max 100MB)");
      return;
    }

    if (
      !file.type.startsWith("image") &&
      !file.type.startsWith("video")
    ) {
      toast.error("Only image or video allowed");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeMedia = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("text", text.trim());

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await sendMessage(formData);

      setText("");
      removeMedia();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">

      {/* Preview */}
      {preview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">

            {selectedFile?.type.startsWith("image") ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
            ) : (
              <video
                src={preview}
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
            )}

            {/* 🔄 Spinner overlay */}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <Loader2 className="animate-spin text-white" />
              </div>
            )}

            <button
              onClick={removeMedia}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
              disabled={isUploading}
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">

          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isUploading}
          />

          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isUploading}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              selectedFile ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={isUploading || (!text.trim() && !selectedFile)}
        >
          {isUploading ? (
            <Loader2 size={22} className="animate-spin" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  );
}

export default MessageInput;