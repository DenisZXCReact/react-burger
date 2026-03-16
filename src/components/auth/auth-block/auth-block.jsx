export default function AuthBlock({ title, children }) {
  return (
    <div className="formBlock">
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      {children}
    </div>
  );
}
