import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Certificate from './Certificate';
import ViewCertificate from './ViewCertificate';
import ErrorPage from './Error';
import { AnimatePresence } from 'framer-motion';

function App() {
	return (
		<>
			<AnimatePresence>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/certificate/*'
						element={<Certificate />}
					/>
					<Route
						path='/error'
						element={<ErrorPage />}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
