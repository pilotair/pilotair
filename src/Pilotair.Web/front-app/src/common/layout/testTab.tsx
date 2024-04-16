import { useState } from "react";

export function TestTab() {

    const [count, setCount] = useState(0)

    return <div>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>btn</button>
    </div>
}