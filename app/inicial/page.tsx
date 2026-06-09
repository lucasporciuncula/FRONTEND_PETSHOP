"use client"

export default function Home() {

    return(
    <body className="font-sans antialiased text-gray-900 bg-white">
        <nav className="bg-gray-100 py-4 static top-0 left-0 w-full z-50 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <a className="text-xl font-bold text-gray-800" href="#!">Start Bootstrap</a>
                <a className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200" href="#signup">Sign Up</a>
            </div>
        </nav>
        <header className="relative bg-gray-800 py-24 md:py-32 bg-cover bg-center" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('assets/img/bg-masthead.jpg');"}}>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl text-center text-white">
                        
                        <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Generate more leads with a professional landing page!</h1>
                        
                        <form id="contactForm" data-sb-form-api-token="API_TOKEN" className="w-full max-w-xl mx-auto">
                           
                            <div className="flex flex-col sm:flex-row gap-3 items-start justify-center">
                                <div className="w-full relative">
                                    <input className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required,email" />
                                    <div className="hidden text-sm text-red-400 mt-1 text-left" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                    <div className="hidden text-sm text-red-400 mt-1 text-left" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                </div>
                                <button className="w-full sm:w-auto whitespace-nowrap bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-lg px-6 py-3 rounded-lg transition duration-200" id="submitButton" type="submit">Submit</button>
                            </div>
                           
                            <div className="hidden text-center mt-6" id="submitSuccessMessage">
                                <div className="font-bold text-xl mb-2">Form submission successful!</div>
                                <p className="text-gray-300">To activate this form, sign up at</p>
                                <a className="text-blue-400 hover:underline break-all" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </div>
                           
                            <div className="hidden text-center text-red-400 mt-6" id="submitErrorMessage">
                                <div>Error sending message!</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </header>
        <section className="bg-gray-100 py-16 md:py-24 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                   
                    <div className="max-w-sm mx-auto">
                        <div className="flex justify-center mb-4 text-6xl text-blue-600"><i className="bi-window"></i></div>
                        <h3 className="text-2xl font-bold mb-2">Fully Responsive</h3>
                        <p className="text-gray-600 text-lg">This theme will look great on any device, no matter the size!</p>
                    </div>
                    
                    <div className="max-w-sm mx-auto">
                        <div className="flex justify-center mb-4 text-6xl text-blue-600"><i className="bi-layers"></i></div>
                        <h3 className="text-2xl font-bold mb-2">Bootstrap 5 Ready</h3>
                        <p className="text-gray-600 text-lg">Featuring the latest build of the new Bootstrap 5 framework!</p>
                    </div>
                    
                    <div className="max-w-sm mx-auto">
                        <div className="flex justify-center mb-4 text-6xl text-blue-600"><i className="bi-terminal"></i></div>
                        <h3 className="text-2xl font-bold mb-2">Easy to Use</h3>
                        <p className="text-gray-600 text-lg">Ready to use with your own content, or customize the source files!</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="overflow-hidden">
            
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:order-2 h-64 md:h-96 lg:h-auto bg-cover bg-center" style={{ backgroundImage: "url('assets/img/bg-showcase-1.jpg')"}}></div>
                <div className="lg:w-1/2 lg:order-1 my-auto px-8 py-16 md:px-16 lg:py-32">
                    <h2 className="text-3xl font-bold mb-3">Fully Responsive Design</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">When you use a theme created by Start Bootstrap, you know that the theme will look great on any device, whether its a phone, tablet, or desktop the page will behave responsively!</p>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-64 md:h-96 lg:h-auto bg-cover bg-center" style={{backgroundImage: "url('assets/img/bg-showcase-2.jpg')"}}></div>
                <div className="lg:w-1/2 my-auto px-8 py-16 md:px-16 lg:py-32">
                    <h2 className="text-3xl font-bold mb-3">Updated For Bootstrap 5</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">Newly improved, and full of great utility classes, Bootstrap 5 is leading the way in mobile responsive web development! All of the themes on Start Bootstrap are now using Bootstrap 5!</p>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:order-2 h-64 md:h-96 lg:h-auto bg-cover bg-center" style={{backgroundImage: "url('assets/img/bg-showcase-3.jpg')"}}></div>
                <div className="lg:w-1/2 lg:order-1 my-auto px-8 py-16 md:px-16 lg:py-32">
                    <h2 className="text-3xl font-bold mb-3">Easy to Use & Customize</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">Landing Page is just HTML and CSS with a splash of SCSS for users who demand some deeper customization options. Out of the box, just add your content and images, and your new landing page will be ready to go!</p>
                </div>
            </div>
        </section>
    </body>


    );
}