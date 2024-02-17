const Banner = () => {
	return (
		<div
			id="banner"
			className="hidden bg-blue-950 text-white font-semibold rounded-b-sm md:flex justify-between items-center px-16 h-10 mb-2">
			<ul id="contacts" className="flex items-center gap-6">
				<li className="flex gap-2 items-center">
					<img
						src="/assets/social_media/logo-whatsapp-white.svg"
						alt="Logo de whatsapp"
					/>{" "}
					<span>(225) 555-0118</span>
				</li>
				<li className="flex gap-2 items-center">
					<img
						src="/assets/navbar-icons/icon-mail.svg"
						alt="Logo del correo electronico"
					/>{" "}
					<span>karokids@gmail.com</span>
				</li>
			</ul>
			<ul id="socials" className="flex items-center gap-4">
				<li>
					<span>Follow Us: </span>
				</li>
				<li>
					<img
						src="/assets/social_media/logo-instagram-white.svg"
						alt="Logo de Instagram"
					/>
				</li>
				<li>
					<img
						src="/assets/social_media/logo-youtube-white.svg"
						alt="Logo de YouTube"
					/>
				</li>
				<li>
					<img
						src="/assets/social_media/logo-facebook-white.svg"
						alt="Logo de Facebook"
					/>
				</li>
			</ul>
		</div>
	);
};

export default Banner;
