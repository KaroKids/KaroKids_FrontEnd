const SideBarSocial = () => {
	return (
		<nav className="flex fixed z-50 right-0 top-20 mt-48 transition-all duration-300 shadow-md bg-white rounded-l-xl">
			<ul>
				<li>
					<a
						href="https://www.facebook.com/YosoyKaroKids/?locale=es_LA"
						target="_blanck"
						className="justify-center flex  h-10 sm:h-16 w-10 sm:w-12 text-white bg-blue-600 rounded-tl-lg">
						<img
							src="/assets/social_media/facebook-color.svg"
							className="w-12 p-2"></img>
						<span className="hidden font-bold uppercase">Facebook</span>
					</a>
				</li>
				<li>
					<a
						href="https://www.instagram.com/yosoy.karokidsmoda/"
						target="_blanck"
						className="justify-center flex h-10 sm:h-16 w-10 sm:w-12 text-white bg-rose-500">
						<img
							src="/assets/social_media/instagram-color.svg"
							className="w-9 sm:w-10 p-2"></img>
						<span className="hidden font-bold uppercase">Instagram</span>
					</a>
				</li>
				<li>
					<a
						href="https://www.youtube.com/@karokidsmodainfantil4675"
						target="_blanck"
						className="justify-center flex h-10 sm:h-16 w-10 sm:w-12 text-white bg-red-600">
						<img
							src="/assets/social_media/youtube-color.svg"
							className="w-12 p-2"></img>
						<span className="hidden font-bold uppercase">Youtube</span>
					</a>
				</li>
				<li>
					<a
						href="https://wa.link/fdh8yl"
						target="_blanck"
						className="justify-center flex h-10 sm:h-16 w-10 sm:w-12 text-white bg-green-600 rounded-bl-lg">
						<img
							src="/assets/social_media/whatsapp-color.svg"
							className="w-9 sm:w-10 p-2"></img>
						<span className="hidden font-bold uppercase">Whatsapp</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default SideBarSocial;
