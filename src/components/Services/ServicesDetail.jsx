import React from "react";

const ServicesDetail = () => {
	return (
		<section className="flex flex-col justify-center py-2 border-b-2">
			<section className="grid grid-cols-1 sm:grid-cols-3 my-6 lg:mx-48">
				<div className="flex flex-row justify-start">
					<img
						src="/assets/services/delivery.svg"
						alt="delivery"
						className="w-20 px-6"
					/>
					<div className="flex flex-col text-start">
						<p className="font-bold">ENVÍOS GRATIS</p>
						<p>Para compras mayores a $50.000</p>
					</div>
				</div>
				<div className="flex flex-row justify-start">
					<img
						src="/assets/services/creditCard.svg"
						alt="creditCard"
						className="w-20 px-6"
					/>
					<div className="flex flex-col text-start">
						<p className="font-bold">3 CUOTAS</p>
						<p>SIN INTERÉS</p>
					</div>
				</div>
				<div className="flex flex-row justify-start">
					<img
						src="/assets/services/secureSite.svg"
						alt="secureSite"
						className="w-20 px-6"
					/>
					<div className="flex flex-col text-start">
						<p className="font-bold">SITIO SEGURO</p>
						<p>Protegemos tus datos</p>
					</div>
				</div>
			</section>
		</section>
	);
};

export default ServicesDetail;
