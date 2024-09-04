"use client";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUpload({
  setFiles,
  files,
  multiple,
  // setFilenames,
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [filenames, setFilenames] = useState<string[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file); // Изменяем ключ на "files"
        });

        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to parse PDF");
        }

        const data = await response.json();
        console.log("data", data);
        console.log(
          "files",
          Array.from(files).map((file) => file.name)
        );
        setFiles(data.texts); // Получаем массив текстов
        setFilenames(Array.from(files).map((file) => file.name)); // Получаем массив текстов
      } catch (error) {
        console.error("Error parsing PDF:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        <p>{loading ? "Loading..." : "Upload file"}</p>
        <VisuallyHiddenInput
          type="file"
          multiple={multiple}
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
      </Button>
      {filenames.length > 0 && (
        <div>
          <h3>Uploaded files:</h3>
          <Box display="flex" flexDirection="column">
            {filenames.map((file) => (
              <Box key={file}>{file}</Box>
            ))}
          </Box>
          {/* {files.map((text, index) => (
            <p key={index}>{text}</p>
          ))} */}
        </div>
      )}
    </>
  );
}
