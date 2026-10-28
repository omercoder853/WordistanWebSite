import "./Marketing.css"

function Marketing() {
    return (
        <div className="container marketing">
            <div className="row mt-5 text-center">
                <div className="col-lg-6 border-end border-3">
                    <h1>Speed &amp; Accuracy</h1>
                    <h3 className="fw-normal">Lightning-Fast Contextual Translation</h3>
                    <p className="mx-auto" style={{ width: 270 }}>
                        Stop guessing. Get instant, human-like translations that
                        understand nuances, slang, and technical context. Accurate
                        results, every single time.
                    </p>
                    <p>
                        <a className="btn btn-outline-primary" href="/">
                            Translate Now
                        </a>
                    </p>
                </div>
                <div className="col-lg-6 mb-4">
                    <h1>Personalization</h1>
                    <h3 className="fw-normal">Your Permanent Vocabulary Vault</h3>
                    <p className="mx-auto" style={{ width: 250 }}>
                        Save only what matters to you. Capture words, phrases, or
                        entire sentences and save them exactly as you found them for
                        perfect recall.
                    </p>
                    <p>
                        <a className="btn btn-outline-primary" href="/">
                            Create Your First Dictionary
                        </a>
                    </p>
                </div>
            </div>

            <hr className="featurette-divider" />

            <div className="row mt-5 text-center">
                <div className="col-lg-6 mb-4 border-end border-3">
                    <h1>Learning Deeply</h1>
                    <h3 className="fw-normal">
                        Master Recall with Smart Spaced Repetition
                    </h3>
                    <p className="mx-auto" style={{ width: 250 }}>
                        Don&apos;t just save it, own it. Our smart algorithm creates
                        personalized review sessions, making sure your saved words
                        move from short-term to long-term memory.
                    </p>
                    <p>
                        <a className="btn btn-secondary disabled" href="#" aria-disabled="true">
                            Explore
                        </a>
                    </p>
                </div>
                <div className="col-lg-6">
                    <h1>Gamification</h1>
                    <h3 className="fw-normal">
                        Gamified Learning &amp; Weekly Challenges
                    </h3>
                    <p className="mx-auto" style={{ width: 250 }}>
                        Transform study time into play time. Earn points, unlock
                        achievements, and compete with friends to make learning new
                        languages addictive and fun.
                    </p>
                    <p>
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            disabled
                        >
                            Play a Word Game
                        </button>
                    </p>
                </div>
            </div>

            <hr className="featurette-divider" />
        </div>
    )
}

export default Marketing
