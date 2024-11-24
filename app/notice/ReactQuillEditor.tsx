import { useApiClient } from "@/context/useApiClient";
import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface ReactQuillEditorProps {
  style?: React.CSSProperties;
  value?: string;
  onChange: (value: string) => void;
  onImageDelete?: (imagePath: string) => void;
}

function ReactQuillEditor({
  style,
  value = "",
  onChange,
  onImageDelete,
}: ReactQuillEditorProps) {
  const { requestWithToken } = useApiClient();
  const quillRef = useRef<ReactQuill | null>(null);

  const imageHandler = async () => {
    if (!quillRef.current) return;

    const quillInstance: any = quillRef.current.getEditor();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    console.log("이미지 등록 테스트");

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await requestWithToken(
          `${apiUrl}/admin/notices/images/tmp`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData,
          }
        );

        const responseData = await response.json();
        console.log("Server Response:", responseData); // Check the actual response

        if (!response.ok) {
          throw new Error("이미지 업로드 실패");
        }

        // const responseData = await response.json();
        const imageUrl = `${responseData.data.savedPath}`;
        const range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, "image", imageUrl);
        quillInstance.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
        // console.error("이미지 업로드 실패:", error);
        // alert("이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    };
  };

  // 에디터 내 이미지 삭제 핸들러
  const editorDeleteHandler = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLImageElement) {
      const imageElement = event.target as HTMLImageElement;
      const imagePath = imageElement.getAttribute("src");

      console.log("이미지 삭제 테스트");

      if (imagePath && onImageDelete) {
        // 부모 컴포넌트로 삭제 요청 전달 (서버에서 삭제)
        onImageDelete(imagePath);
      }

      // 에디터에서 이미지 제거
      const quillInstance = quillRef.current?.getEditor();
      const delta = quillInstance?.getContents();
      if (delta && delta.ops) {
        // 기존 delta에서 이미지 삭제
        const ops = delta.ops.filter(
          (op: any) => !(op.insert && op.insert.image === imagePath)
        );

        const updatedDelta = ops;
        quillInstance?.setContents(updatedDelta); // Delta 객체로 업데이트
      }
    }
  };

  // 모듈 구성
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["image"], // 이미지 버튼
          [{ header: [1, 2, 3, 4, 5, false] }], // 헤더 스타일
          ["bold", "underline"], // 글자 스타일
        ],
        handlers: {
          image: imageHandler, // 커스텀 이미지 핸들러
        },
      },
    }),
    []
  );

  return (
    <div
      onClick={editorDeleteHandler} // 이미지 클릭 시 삭제 핸들러
      style={style}
    >
      <ReactQuill
        ref={quillRef}
        modules={modules}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default ReactQuillEditor;
