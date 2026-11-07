import { parseDetails } from "@/app/utils/productContent";

// Renders the admin's "توضیحات تکمیلی" field; see parseDetails for the format.
export default function ProductDetails({ text, className = "" }) {
  return (
    <div className={`az-rich-content ${className}`}>
      {parseDetails(text).map((block, index) => {
        if (block.type === "heading") {
          return <h3 key={index}>{block.text}</h3>;
        }
        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
