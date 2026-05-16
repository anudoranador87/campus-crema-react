import { useState } from "react";


function TextExpander({
    children,
    collapsedNumWords = 10,
    expandButtonText = "Mostrar menos",
    collapseButtonText = "Mostrar mas",
    buttonColor,
    expanded,
    className,
    colorText,
  }){
    const [isOpen, setOpen] = useState(expanded);
  
    function handleClick() {
      setOpen(!isOpen);
    }
  
    return (
      <div className={className}>
        <span style={{ color: isOpen ? "#b5541a" : "#5f5f5f" }}>
  {isOpen ? children : String(children).split(" ").slice(0, collapsedNumWords).join(" ")}
</span>
        <button
        style={{ 
            color: buttonColor || "#b5541a",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontWeight: 600,
            fontSize: "0.85rem"
          }}
          type="button"
                    onClick={handleClick}
        >
          {isOpen ? expandButtonText : collapseButtonText}
        </button>
      </div>
    );
  
          }

          export default TextExpander