function Footer() {
    return (
        <div class="container w-screen">
            <div class="flex flex-col md:flex-row justify-between items-center p-10 bg-indigo-800 text-white">
                <div class="m-auto">
                    <div class="text-center">
                        <p>Stay tuned with latest news and updates.</p>
                        <h2 class="font-bold">Download the temple app now</h2>
                    </div>
                    <div class="pt-2 flex justify-center gap-x-3">
                        <a
                            href=""
                            class="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"
                        >
                            <img
                                src="https://www.logo.wine/a/logo/App_Store_(iOS)/App_Store_(iOS)-Badge-Logo.wine.svg"
                                alt="App Store"
                                class="w-36 lg:w-44 xl:w-auto"
                                width="209"
                                height="60"
                            />
                        </a>

                        <a
                            href=""
                            class="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"
                        >
                            <img
                                src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Badge-Logo.wine.svg"
                                alt="App Store"
                                class="w-36 lg:w-44 xl:w-auto"
                                width="209"
                                height="60"
                            />
                        </a>
                    </div>
                </div>

                <div class="w-full md:w-6/12">
                    <form class="w-full" noValidate>
                        <div class="flex flex-col items-center">
                            <div class="w-full">
                                <input
                                    id="subscription_email"
                                    name="subscription_email"
                                    type="email"
                                    placeholder="Write your email here"
                                    class="py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading md:h-12 px-4 lg:px-7 h-12 lg:h-14 text-center bg-white text-black"
                                    autoComplete="off"
                                    spellCheck="false"
                                    aria-invalid="false"
                                />
                            </div>
                            <button
                                data-variant="flat"
                                class="w-full bg-black transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-800 mt-2 flex-shrink-0"
                            >
                                <span class="lg:py-0.5">Subscribe</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer