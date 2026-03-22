export async function fetchTags(setTags, setError) {

    try {

        const res = await fetch("http://localhost:3000/tags");

        if(!res.ok){
            throw new Error("Tags fetch failed");
        }

        const data = await res.json();

        setTags(data);

    } catch(err){

        setError(err.message);

    }
}
