import './App.css';
import "vditor/dist/index.css";
import Vditor from "vditor";
import {useEffect, useState} from "react";

// todo 拖动打开 保存文件 另存为 打印 等等


const App = () => {
    const [loading, setLoading] = useState(true);
    const [vd, setVd] = useState();
    const [text, setText] = useState('');
    useEffect(() => {
        window.electronAPI.handleCounter((e,v) => {
            console.log(e,v)
            window.data=v;
        })


        const vditor = new Vditor("vditor", {
            toolbar: [
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "|",
                "list",
                "ordered-list",
                "check",
                "outdent",
                "indent",
                "|",
                "quote",
                "line",
                "code",
                "inline-code",
                "insert-before",
                "insert-after",
                "|",
                "upload",
                "record",
                "table",
                "|",
                "undo",
                "redo",
                "|",
                "edit-mode",
                {
                    name: "more",
                    toolbar: [
                        "both",
                        "code-theme",
                        "content-theme",
                        "export",
                        "outline",
                        "preview",
                        "devtools",
                        "info",
                        "help",
                    ],
                },
            ],
            after: () => {
                console.log(text)
                vditor.setValue(window.data || '');
                setVd(vditor);
                setLoading(false);
            }
        });
        return () => {

        }
    }, []);
    return <div className="wrap">
        {loading ? <div className="loading">Loading...</div> : ''}
        <div id="vditor" className="vditor vditor--fullscreen" style={{opacity: loading ? 0 : 1}}/>
    </div>;
};

export default App;
