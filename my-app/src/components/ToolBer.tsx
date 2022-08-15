import ToolButton from "./ToolButton";

function ToolBer(){
    return (
      <div>
        <ToolButton src = "src/assets/print.svg" onClick = {() => {window.print();}}/>
      </div>
    );
}

export default ToolBer;