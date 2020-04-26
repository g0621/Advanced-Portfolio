import React, {useCallback, useEffect, useMemo, useState} from 'react'
import isHotkey from 'is-hotkey'
import {Editable, withReact, Slate} from 'slate-react'
import {createEditor} from 'slate'
import {withHistory} from 'slate-history'

import {Toolbar} from './components/components'
import {initialValue, HOTKEYS} from "./initial-value";
import {Leaf, Element} from "./renderers";
import {toggleMark, MarkButton, BlockButton} from "./helpers";
import ControllMenu from "./components/ControllMenu";

const RichTextEditor = (props) => {
    const [value, setValue] = useState(null)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const handleKeyDown = (event) => {
        for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
            }
        }
        const {isLoading} = props;
        if (!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            save();
        }
    }


    const handleChange = (value) => {
        setValue(value)
        const content = JSON.stringify(value);
        localStorage.setItem('content', content);
    }

    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        const valueFromProps = props.initialValue ;
        const valuee = valueFromProps ? valueFromProps : initialValue;
        setValue(valuee);
        setLoaded(true);
    }, [])

    const getTitle = () => {
        const firstBlock = editor.children.length > 0 ? editor.children[0] : null;
        const secondBlock = editor.children.length > 1 ? editor.children[1] : null;

        const title = firstBlock ? firstBlock.children.map((child) => {
            return child.text;
        }).join('') : 'No title';
        const subtitle = secondBlock ? secondBlock.children.map((child) => {
            return child.text;
        }).join('') : 'No subtitle';

        return {
            title,
            subtitle
        }
    }

    const save = () => {
        const saveFunction = props.save;
        const parentLoading = props.isLoading;
        const headingValues = getTitle();
        !parentLoading && saveFunction(value, headingValues);
    }

    return isLoaded ? (
        <React.Fragment>
            <ControllMenu isLoading={props.isLoading} save={() => save()}/>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <Toolbar>
                    <MarkButton format="bold" icon="format_bold"/>
                    <MarkButton format="italic" icon="format_italic"/>
                    <MarkButton format="underline" icon="format_underlined"/>
                    <MarkButton format="code" icon="code"/>
                    <BlockButton format="heading-one" icon="looks_one"/>
                    <BlockButton format="heading-two" icon="looks_two"/>
                    <BlockButton format="block-quote" icon="format_quote"/>
                    <BlockButton format="numbered-list" icon="format_list_numbered"/>
                    <BlockButton format="bulleted-list" icon="format_list_bulleted"/>
                </Toolbar>
                    <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={handleKeyDown}
                    />
            </Slate>
        </React.Fragment>
    ) : (
        <div>
            <p>Loading.....</p>
        </div>
    )
}


export default RichTextEditor