import { CopyIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import Highlight from 'react-highlight'

export function CodePreview({
    language,
    textClass,
    text
  }: {
    language: string
    textClass: string
    text: string
  }) {
    const [tooltip, setTooltip] = useState<string>('Copy');
    return (
        <div style={{position: 'relative'}}>
            <Highlight language={language} className={textClass}>
                {text}
            </Highlight>
            <Tooltip placement='top' closeDelay={500} hasArrow label={tooltip}>
                <CopyIcon style={{color: 'white'}} className='highlight-copy' cursor={'pointer'} onClick={async () => {
                console.log(`copied '${text}' from icon`);
                setTooltip('Copied');
                setTimeout(()=>{
                    setTooltip('Copy');
                },1000);
                await navigator.clipboard.writeText(text);
                }}/>
            </Tooltip>
      </div>
    )
}