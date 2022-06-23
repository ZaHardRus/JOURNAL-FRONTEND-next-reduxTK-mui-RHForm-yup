import React, {useEffect} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import ImageTool from '@editorjs/image';
import {Card, Paper} from "@mui/material";
const CodeTool = require('@editorjs/code');


interface EditorProps {
    value?: OutputData['blocks']
    setBlocks: (blocks: OutputData['blocks']) => void
}

export const Editor: React.FC<EditorProps> = ({setBlocks, value}) => {
    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            placeholder: 'Начните вводить текст',
            async onChange() {
                const {blocks} = await editor.save()
                setBlocks(blocks)
            },
            data: {
                blocks: value
            },
            tools: {
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'https://journaldb.herokuapp.com/upload',
                        },
                        field: 'file'
                    }
                },
                code:CodeTool
            },
            minHeight: 50
        })
        return () => {
            editor.isReady
                .then(() => {
                    editor.destroy()
                })
                .catch(() => console.log('editor cleanup error'))
        }
    }, [])
    return (
            <div id='editor'/>
    )
}