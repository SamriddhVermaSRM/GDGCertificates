import { motion } from 'framer-motion';

function ViewCertificate() {
	var data = JSON.parse(localStorage.getItem('data'));

	// data ? {} : (window.location.href = '/certificate');
	if (!data) {
		window.location.href = '/certificate';
	}
	console.log(data);

	const url = window.location.href.split('/')[2];
	console.log(url);

	const printCertificate = () => {
		let mywindow = window.open('', 'PRINT', 'height=1080,width=1920');
		mywindow.document.write(
			`<html><head><title>GDG SRMCEM Certificate</title>`
		);
		mywindow.document.write(
			'<link rel="stylesheet" href="http://' + url + '/style.css">'
		);
		mywindow.document.write('</head><body>');
		mywindow.document.write(document.querySelector('.pbody').innerHTML);
		mywindow.document.write('</body></html>');

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10*/
		mywindow.print();
	};

	return (
		<>
			<div className='printbar'>
				<div>
					<h1>Click this button to print your certificate</h1>
					<p>
						<b>NOTE:</b>
						set the page size as A4, and margin as none if it isn't in 1 page
					</p>
				</div>
				<button
					onClick={() => {
						printCertificate();
					}}
				>
					Print
				</button>
			</div>
			<motion.main
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ type: 'spring', stiffness: 50 }}
			>
				<div className='container'>
					<div className='logo'>
						<img
							className='logo-gdg'
							src='/logo-gdg.png'
							alt=''
						/>
						<img
							className='logo-srmcem'
							src='/logo-srmcem.png'
							alt=''
						/>
					</div>

					<div className='certificate'>
						<h1>
							Certificate <span id='sp1'>of</span>{' '}
							<span id='sp2'>Achievement</span>
						</h1>
						<h2>{data.name}</h2>
						<p>
							For active participation in the GenAI Study Jam and commitment to
							learning about Generative AI and Google Cloud. This achievement
							highlights dedication to advancing knowledge in innovative
							technologies.
						</p>
					</div>
					<div className='signatures'>
						<div id='sign-gdg'>
							<img src='/gdg-org.png' />
							GDG on Campus Organiser
						</div>

						<div id='sign-hod'>
							<img src='/gdg-hod.png' />
							Head of Department CSE & AI/ML SRMCEM
						</div>
					</div>

					<div className='badges'>
						{data.links.badges.map((badge, index) => {
							if (index === 0) {
								return (
									<a
										key={index}
										className='badge'
										href={badge}
									>
										<img
											className='badge-img'
											src={data.links.images[index]}
											alt='badge'
										/>
										<img
											className='badge-bg'
											src={data.links.images[index]}
											alt='badge'
										/>
									</a>
								);
							}
							return (
								<a
									key={index}
									className='badge'
									href={badge}
								>
									<img
										className='badge-img'
										src={data.links.images[index]}
										alt='badge'
									/>
									<img
										className='badge-bg'
										src='/badge-bg.png'
										alt='badge'
									/>
								</a>
							);
						})}
					</div>
				</div>
			</motion.main>
			<PrintCertificate data={data} />
		</>
	);
}

function PrintCertificate({ data }) {
	return (
		<div className='pbody'>
			<div className='container'>
				<div className='logo'>
					<img
						className='logo-gdg'
						src='/logo-gdg.png'
						alt=''
					/>
					<img
						className='logo-srmcem'
						src='/logo-srmcem.png'
						alt=''
					/>
				</div>

				<div className='certificate'>
					<h1>
						Certificate <span id='sp1'>of</span>{' '}
						<span id='sp2'>Achievement</span>
					</h1>
					<h2>{data.name}</h2>
					<p>
						For active participation in the GenAI Study Jam and commitment to
						learning about Generative AI and Google Cloud. This achievement
						highlights dedication to advancing knowledge in innovative
						technologies.
					</p>
				</div>
				<div className='signatures'>
					<div id='sign-gdg'>
						<img src='/gdg-org.png' />
						GDG on Campus Organiser
					</div>

					<div id='sign-hod'>
						<img src='/gdg-hod.png' />
						Head of Department CSE & AI/ML SRMCEM
					</div>
				</div>

				<div className='badges'>
					{data.links.badges.map((badge, index) => {
						if (index === 0) {
							return (
								<a
									key={index}
									className='badge'
									href={badge}
								>
									<img
										className='badge-img'
										src={data.links.images[index]}
										alt='badge'
									/>
									<img
										className='badge-bg'
										src={data.links.images[index]}
										alt='badge'
									/>
								</a>
							);
						}
						return (
							<a
								key={index}
								className='badge'
								href={badge}
							>
								<img
									className='badge-img'
									src={data.links.images[index]}
									alt='badge'
								/>
								<img
									className='badge-bg'
									src='/badge-bg.png'
									alt='badge'
								/>
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ViewCertificate;
