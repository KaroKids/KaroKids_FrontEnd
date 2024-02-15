import React from "react";

export const Footer = () => {
	return (
		<footer class="bg-gray-100 py-5">
			<div class="container mx-auto">
				<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<section class="mb-8 md:mb-0">
						<h5 class="mb-4 text-lg">Información de contacto</h5>
						<address>
							<p>Tienda XYZ</p>
							<p>Dirección de la tienda</p>
							<p>
								Teléfono: <a href="tel:123-456-789">123-456-789</a>
							</p>
						</address>
					</section>
					<section>
						<h5 class="mb-4 text-lg">Enlaces</h5>
						<nav>
							<ul class="flex flex-cl">
								<li class="mr-4 mb-2">
									<a href="#" class="text-gray-700 hover:text-gray-900">
										Inicio
									</a>
								</li>
								<li class="mr-4 mb-2">
									<a href="#" class="text-gray-700 hover:text-gray-900">
										Productos
									</a>
								</li>
								<li class="mr-4 mb-2">
									<a href="#" class="text-gray-700 hover:text-gray-900">
										Promociones
									</a>
								</li>
								<li class="mr-4 mb-2">
									<a href="#" class="text-gray-700 hover:text-gray-900">
										Contacto
									</a>
								</li>
							</ul>
						</nav>
					</section>
				</section>
			</div>
		</footer>
	);
};
