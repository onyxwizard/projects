// User profile
const userName = document.querySelector(".user-name");
const userContent = document.querySelector(".user-content");
const userPhoto = document.querySelector(".user-image");
    
const testimonial = [
    {
        name:"- Emily Wilson",
        content:"I am extremely impressed with the software provided by apple. It is user-friendly, efficient, and innovative.  I highly recommend apple to anyone looking for top-notch software solutions.",
        photo:"https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name:"- Emily Thompson",
        content:"My experience with Microsoft's software has been exceptional. Their innovative solutions have greatly improved our efficiency and productivity.",
        photo:"https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name:"- Emily Ward",
        content:"Their seamless integration and reliable performance have greatly improved our workflow efficiency. I highly recommend Microsoft for anyone seeking top-notch software solutions.",
        photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
]

let idx = 0;
function updateUser(idx) {
    const size = testimonial.length;
    const { name, content, photo } = testimonial[idx];
    userPhoto.src = photo;
    userContent.innerText = content;
    userName.innerText = name;
    idx++;

    if (idx == size) {
        idx = 0;
    }

    setTimeout(() => {
        updateUser(idx);
    },3500)
    
}

updateUser(idx)

