const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, name) => {
    const videoComments = document.querySelector(".video__comments");

    const newComment = document.createElement("div");
    newComment.className = "comment";

    const username = document.createElement("span");
    username.innerText = name

    const createdAt = document.createElement("small");
    createdAt.innerText = new Date().toDateString()

    const commentText = document.createElement("span");
    commentText.innerText = text

    newComment.appendChild(username);
    newComment.appendChild(createdAt);
    newComment.appendChild(commentText);
    videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const id = videoContainer.dataset.id;
    if(text === ""){
        return;
    }
    const res = await fetch(`/api/videos/${id}/comment`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text}),
    });
    const json = await res.json();
    console.log(json);
    if(res.status === 201){
        addComment(text, json.username);
    } else {

    }
    textarea.value = "";
}

if(form) {
    form.addEventListener("submit", handleSubmit);
}