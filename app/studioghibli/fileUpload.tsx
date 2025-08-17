export function FileUpload({ title }: { title: string }) {
  async function sendToAi(formData: FormData) {
    "use server";
    const rawFormData = {
      file: formData.get("file"),
    };
  }
  return (
    <form
      action={sendToAi}
      className="flex flex-col items-center justify-center text-center m-auto mt-12 w-4/5 relative"
    >
      <div className="flex border-3 border-dashed rounded-lg w-full h-80">
        <label htmlFor="headshot-image" className="text-xl font-semibold m-auto items-center">
          Upload a clear image of your face
        </label>
        <input name="headshot-image" type="file" className="hidden" />
      </div>
      <button className="w-full mt-8 px-2 py-4 bg-blue-600 text-white rounded-md font-semibold">Turn me to {title}</button>
    </form>
  );
}
