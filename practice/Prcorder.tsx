import prc from "./prccreate";
export default function Form(){
    return(
        <form action={prc}>
            <input type="date-local" step="1800" name="startTime" />
            <button type="submit">送信</button>
        </form>
    )
}