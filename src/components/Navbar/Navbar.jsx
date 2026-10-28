import "./Navbar.css"

function Navbar() {
    return (
        <nav class="navbar nav-underline navbar-expand-lg bg-body-tertiary fixed-top d-flex align-items-center" id="navbar">
            <div class="container-fluid">
                <a class="navbar-brand d-flex align-items-center" href="/">
                    <img src="../../../public/logo.png" alt="Wordistan Logo" width="45"
                        class="d-inline-block align-text-top me-2" />
                    <span id="brand_text">Wordistan</span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navbar_items">
                        <li class="nav-item">
                            <a class="nav-link {% if request.path == '/index' %}active{% endif %}" aria-current="page"
                                href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {% if request.path == '/translate' %}active{% endif %}" aria-current="page"
                                href="/">Translate</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {% if request.path == '/dictionaries' %}active{% endif %}"
                                aria-current="page" href="/">Dictionaries</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;