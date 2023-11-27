import { createRef } from "react";

export default function SearchBar(props) {

    const onKeyUp = (event) => {
        let value = event.target.value;
        // console.log(value);

        // déclenchement d'un appel de fonction dans le contexte du parent
        props.onSearch(value);
    }

    const onClick = () => {
        // efface le contenu du champs de saisie grâce à une référence directe
        ref.current.value = '';

        props.onSearch('');
    }

    const ref = createRef();
    const refSpan = createRef();

    return(
        <div>
            <input ref= {ref} type="text" onKeyUp={onKeyUp} />
            <button onClick={onClick}>x</button>
            <span ref={refSpan}></span>
        </div>
    )
}