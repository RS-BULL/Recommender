const backendUrl = "https://recommender-vphd.onrender.com";  // Replace with actual backend URL
let allVideos = [];
let displayedCount = 0;

async function fetchVideos(query) {
    try {
        const response = await fetch(`https://recommender-vphd.onrender.com/search?q=${query}`);
        const data = await response.json();
        
        console.log("API Response:", data);  // ✅ Debugging step

        if (!Array.isArray(data.videos)) {
            throw new Error("Invalid data format: videos is not an array");
        }

        const filteredVideos = data.videos.filter(video => video.likes > 100);
        console.log("Filtered Videos:", filteredVideos);

    } catch (error) {
        console.error("Error:", error);
    }
}


// Display videos (2 at a time)
function displayVideos() {
    const container = document.getElementById("results");
    container.innerHTML = "";

    let count = 0;
    for (let i = displayedCount; i < allVideos.length && count < 2; i++) {
        const video = allVideos[i];
        container.innerHTML += `
            <div class="video-card">
                <img src="https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg" alt="Thumbnail">
                <div class="video-info">
                    <p class="video-title">${video.title}</p>
                    <p class="video-meta">${video.viewCount} views • ${formatDuration(video.lengthSeconds)}</p>
                </div>
            </div>
        `;
        count++;
    }

    displayedCount += count;
    document.getElementById("loadMoreBtn").classList.toggle("hidden", displayedCount >= allVideos.length);
}

// Format duration
function formatDuration(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min}m ${sec}s`;
}

// Handle search
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchQuery").value.trim();
    if (query) fetchVideos(query);
});

// Load more videos
document.getElementById("loadMoreBtn").addEventListener("click", displayVideos);

// Handle filter
document.getElementById("filterDuration").addEventListener("change", (event) => {
    const filter = event.target.value;
    if (filter) {
        allVideos = allVideos.filter(video => 
            filter === "short" ? video.lengthSeconds < 600 : video.lengthSeconds >= 600
        );
        displayedCount = 0;
        displayVideos();
    }
});
