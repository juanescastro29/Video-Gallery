import React from 'react'

const VideoCard = () => {
  return (
    <div class="card mb-4" style={{ maxWidth: "540px" }}>
            <div class="row g-0">
              <div class="col-md-5">
                <img src="..." class="img-fluid rounded-start" alt="ytImage" />
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default VideoCard