// External
import Image from "next/image"

// Internal
import { UploadDropzone } from "@/components/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { Block } from "./block_text"

interface FileUploadProps {
  onChange: Function,
  value: string,
  endpoint: "messageFile" | "spaceImage"
}

export const FileUpload = ({
  onChange,
  value,
  endpoint
} : FileUploadProps) => {
  const fileType = value?.split(".").pop()
  if (value && fileType !== "pdf") {
    return (
      <Block className="image-pref relative h-20 w-20">
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full"
        />
      </Block>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}
