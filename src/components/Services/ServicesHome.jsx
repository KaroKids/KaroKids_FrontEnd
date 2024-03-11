const ServicesHome = () => {
	return (
		<section className="flex flex-col justify-center py-2 border-b-2">
			<header className="flex flex-col text-center">
				<p className="pb-1">Nuestro servicio</p>
				<p className="font-bold text-[20px]">¿Por qué nosotros?</p>
			</header>
			<section className="grid grid-cols-1 sm:grid-cols-3 my-6 lg:mx-48">
				<div className="flex flex-col items-center text-center justify-center">
					<img
						src="/assets/services/delivery.svg"
						alt="delivery"
						className="w-10 py-4"
					/>
					<p className="font-bold">ENVÍOS GRATIS</p>
					<p>Para compras mayores a $120.000</p>
				</div>
				<div className="flex flex-col items-center text-center justify-center">
					<img
						src="/assets/services/creditCard.svg"
						alt="creditCard"
						className="w-10 py-4"
					/>
					<p className="font-bold">3 CUOTAS</p>
					<p>SIN INTERÉS</p>
				</div>
				<div className="flex flex-col items-center text-center justify-center">
					<img
						src="/assets/services/secureSite.svg"
						alt="secureSite"
						className="w-10 py-4"
					/>
					<p className="font-bold">SITIO SEGURO</p>
					<p>Protegemos tus datos</p>
				</div>
			</section>
		</section>
	);
};

export default ServicesHome;
