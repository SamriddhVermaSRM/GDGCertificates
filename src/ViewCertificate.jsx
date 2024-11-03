import { motion } from 'framer-motion';
import './ViewCertificate.css';

function ViewCertificate() {
	var data = JSON.parse(localStorage.getItem('data'));

	var urldata = undefined;
	console.log(urldata);
	// data ? {} : (window.location.href = '/certificate');
	if (!data) {
		urldata = window.location.href.split('?data=')[1];
		urldata = JSON.parse(urldata.replaceAll('%22', '"').replaceAll('%20', ' '));
		urldata ? {} : (window.location.href = '/certificate');
		data = urldata;
		console.log(data);
	}

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
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
							officiis illo molestias aperiam dicta voluptas. Vero, recusandae.
							Dolor atque libero quas animi neque id fugit quo et error quae?
							Eius.
						</p>
					</div>
					{/* <div className='signatures'>
						<div id='sign-gdg'></div>
						<div id='sign-hod'></div>
					</div> */}

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
					<h2>NAME OF PARTICIPANT</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
						officiis illo molestias aperiam dicta voluptas. Vero, recusandae.
						Dolor atque libero quas animi neque id fugit quo et error quae?
						Eius.
					</p>
				</div>
				{/* <div className='signatures'>
						<div id='sign-gdg'></div>
						<div id='sign-hod'></div>
					</div> */}

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
