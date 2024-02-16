import React from "react";

const FooterHead = () => {
	return (
		<section className="grid grid-cols-1 sm:grid-cols-2 mb-8 md:mb-0 border-b-2">
			<h1 className="text-xl font-bold mb-5">KaroKids</h1>
			<div className="flex flex-row mb-5 justify-start sm:justify-end">
				<a
					href="https://www.facebook.com/YosoyKaroKids/?locale=es_LA"
					target="_blank">
					<img
						src="/assets/social_media/facebook.svg"
						alt="Facebook"
						className="px-1 w-7"
					/>
				</a>
				<a href="https://www.instagram.com/yosoy.karokidsmoda/" target="_blank">
					<img
						src="/assets/social_media/instagram.svg"
						alt="Instagram"
						className="px-1 w-7"
					/>
				</a>
				<a
					href="https://www.youtube.com/@karokidsmodainfantil4675"
					target="_blank">
					<img
						src="/assets/social_media/youtube.svg"
						alt="Youtube"
						className="px-1 w-7"
					/>
				</a>
				<a href="https://wa.link/fdh8yl" target="_blanck">
					<img
						src="/assets/social_media/whatsapp.svg"
						alt="Whatsapp"
						className="px-1 w-7"
					/>
				</a>
			</div>
		</section>
	);
};

export default FooterHead;
