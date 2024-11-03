function Error() {
	return (
		<div>
			<h1>You might have entered an invalid or wrong URL</h1>
			<div
				onClick={() => {
					window.location.href = '/certificate';
				}}
			>
				<h3>Click This link to head back to try again</h3>
			</div>
		</div>
	);
}

export default Error;
