async function fetchVideos(query) {
    try {
        const response = await fetch(`https://recommender-vphd.onrender.com/search?q=${query}`);
        const data = await response.json();

        console.log("API Response:", data);  // ✅ Debugging step

        if (!Array.isArray(data.videos)) {
            throw new Error("Invalid data format: videos is not an array");
        }

        // ✅ Filter videos (example: more than 1000 views)
        const filteredVideos = data.videos.filter(video => video.views > 1000);

        console.log("Filtered Videos:", filteredVideos);

        displayVideos(filteredVideos);

    } catch (error) {
        console.error("Error:", error);
    }
}

function displayVideos(videos) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Clear previous results

    videos.forEach(video => {
        const videoElement = document.createElement("div");
        videoElement.innerHTML = `
            <div class="video-card">
                <img src="${video.thumbnail}" alt="${video.title}">
                <h3>${video.title}</h3>
                <p>Views: ${video.views}</p>
                <p>Likes: ${video.likes}</p>
                <p>Duration: ${Math.floor(video.duration / 60)} min</p>
                <a href="https://www.youtube.com/watch?v=${video.videoId}" target="_blank">Watch</a>
            </div>
        `;
        resultsDiv.appendChild(videoElement);
    });
}
