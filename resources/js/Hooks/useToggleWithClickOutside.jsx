import React from "react";

function useToggleWithClickOutside(initialState = false) {
    const [isVisible, setIsVisible] = React.useState(initialState);
    const ref = React.useRef(null);

    const toggleVisibility = () => setIsVisible(!isVisible);

    React.useEffect(() => {
        function handleOutsideClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsVisible(false);
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, []);

    return [ ref, isVisible, toggleVisibility ];
}

export default useToggleWithClickOutside;
