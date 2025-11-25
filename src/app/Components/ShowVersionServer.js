"use client";

export default function ShowVersionServer() {
  return (
    <>
      <span className="NormalTextSizing">
        نسخه : {process.env.NEXT_PUBLIC_FRONT_END_VERSION}
      </span>
    </>
  );
}
