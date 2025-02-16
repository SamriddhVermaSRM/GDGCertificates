import { useEffect, useState } from 'react';
import CertificateDetails from './CertificateDetails';
import ViewCertificate from './ViewCertificate';
import { Routes, Route } from 'react-router-dom';

function Certificate() {
	const [ProfileURL, setProfileURL] = useState();
	// https://www.cloudskillsboost.google/public_profiles/b3487dc3-9b6f-4b3a-90bc-8bd65c3a8aea

	const server = window.location.href
		.split('/')[2]
		.split(':')[0]
		.replace('3000', '8080');

	useEffect(() => {
		ProfileURL
			? fetchData(ProfileURL).then((data) => {
					// data ? handleDataFetch(data) : (window.location.href = '/error');
					// window.location.href = '/error'
			  })
			: console.log('waiting for user input');
	}, [ProfileURL]);

	const fetchData = async (url) => {
		console.log('fetching data started');

		try {
			const response = await fetch('http://localhost:3001/' + url, {
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error('You might have entered an invalid or wrong URL');
			}
			const data = await response.text();
			var links = [];
			var images = [];
			var text = [
				'Badge for Level 3: Google Cloud Adventures',
				'Badge for Get Started with Google Workspace Tools',
				'Badge for Get Started with Dataplex',
				'Badge for Get Started with Looker',
				'Badge for Cloud Functions: 3 Ways',
				'Badge for Monitoring in Google Cloud',
				'Badge for Prompt Design in Vertex AI',
				'Badge for Develop GenAI Apps with Gemini and Streamlit',
				'Badge for Get Started with Pub/Sub',
				'Badge for Analyze Images with the Cloud Vision API',
				'Badge for Cloud Speech API: 3 Ways',
				'Badge for Networking Fundamentals on Google Cloud',
				'Badge for App Engine: 3 Ways',
				'Badge for Get Started with API Gateway',
				'Badge for Get Started with Cloud Storage',
				'Badge for The Basics of Google Cloud Compute',
			];
			for (var i = 0; i < text.length; i++) {
				links.push(
					data
						.split('"><img alt="' + text[i] + '" src="')[0]
						.split('<a class="badge-image" href="')
						.pop()
				);
				images.push(
					data.split('"><img alt="' + text[i] + '" src="')[1].split('"')[0]
				);
			}
			const name = data.split('<title>')[1].split('|')[0];
			const obj = {
				name: name,
				links: {
					badges: links,
					images: images,
				},
			};
			return obj;
		} catch (error) {
			console.error(error);
			return undefined;
		}
	};

	const handleDataFetch = (data) => {
		console.log('fetched data');
		localStorage.setItem('data', JSON.stringify(data));
		window.location.href = '/certificate/view';
	};

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<CertificateDetails setProfileURL={setProfileURL} />}
				/>
				<Route
					path='/view'
					element={<ViewCertificate />}
				/>
			</Routes>
		</>
	);
}

export default Certificate;

// (window.location.href = '/error')
