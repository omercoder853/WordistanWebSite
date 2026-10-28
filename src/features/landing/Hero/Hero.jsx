import "./Hero.css"

function Hero() {
    return (
        <section class="py-5" id="hero">
            <div class="container" id="hero_container">
                <div class="row align-items-center">
                    <div class="col-md-6 text-center text-md-start">
                        <h1 class="display-4 fw-bold mb-3">
                            Translate. Learn. Remember.
                            <span class="text-primary"> Enjoy.</span>
                        </h1>
                        <p class="lead mb-4">Fast, contextual translations and a personal dictionary to save what matters.</p>
                        <a href="{% url 'translate' %}" class="btn btn-primary btn-lg">Install Now</a>
                    </div>
                    <div class="col-md-6 text-center">
                        <img src="../../../public/logo.png" alt="Illustration" class="img-fluid" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;