import { useEffect, useRef, useState } from 'react'


const useChatInput = (initialValue: string, sendUserPrompt: () => void) => {
    const [prompt, setPrompt] = useState(initialValue)



    // Handles keydown events in the textarea.
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            // Shift + Enter or Ctrl + Enter inserts a new line.
            if (event.shiftKey || event.ctrlKey) {
                setPrompt(prev => prev + '\n')
            } else {
                // Enter alone triggers the sendUserPrompt function.
                sendUserPrompt()
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(event.target.value)
    }

    return {
        prompt,
        setPrompt,
        handleKeyDown,
        handleChange
    }
}

export default useChatInput
