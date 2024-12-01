import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useApiClient } from "@/context/useApiClient";

interface EditorProps {
  value: string;
  onChange: (data: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const customUploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then(async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            try {
              const response = await fetch(
                `${apiUrl}/admin/notices/images/tmp`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                  body: formData,
                }
              );

              if (!response.ok) {
                throw new Error("업로드 실패");
              }

              const data = await response.json();

              const fullImageUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.data.savedPath}`;
              resolve({
                default: fullImageUrl,
              });
            } catch (error) {
              reject(error);
            }
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        extraPlugins: [uploadPlugin],
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "undo",
            "redo",
          ],
        },
        image: {
          toolbar: [
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "|",
            "toggleImageCaption",
            "imageTextAlternative",
          ],
        },
      }}
    />
  );
}
