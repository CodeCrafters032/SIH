function ProjectFeed() {
	const projectFeed = [
		{
			owner: {
				profilePhoto: "https://picsum.photos/80",
				name: "Alice Smith",
				branch: "Electrical Engineering",
				university: "Harvard University",
			},
			coverPhoto: "https://picsum.photos/1080/300",
			title: "Electricity Generation Project",
			description:
				"This project explores innovative methods for generating clean and sustainable electricity. It involves the design and testing of solar panels and wind turbines.",
			likes: [
				{
					userId: "xyz",
				},
				{
					userId: "abc",
				},
			],
		},
		{
			owner: {
				profilePhoto: "https://picsum.photos/80",
				name: "Bob Johnson",
				branch: "Mechanical Engineering",
				university: "MIT",
			},
			coverPhoto: "https://picsum.photos/1080/300",
			title: "Mechanical Design Challenge",
			description:
				"In this project, we tackle complex mechanical design challenges, such as creating efficient gears and mechanisms for industrial applications.",
			likes: [
				{
					userId: "def",
				},
				{
					userId: "ghi",
				},
			],
		},
		{
			owner: {
				profilePhoto: "https://picsum.photos/80",
				name: "Eva Brown",
				branch: "Computer Science",
				university: "Stanford University",
			},
			coverPhoto: "https://picsum.photos/1080/300",
			title: "AI Chatbot Development",
			description:
				"Our team is working on creating an advanced AI chatbot using natural language processing and machine learning techniques. Stay tuned for updates!",
			likes: [
				{
					userId: "jkl",
				},
			],
		},
	];

	return (
		<div className=" w-full h-full mt-5">
			<h1 className="ml-4 mb-4 w-full text-[25px] font-bold text-xl">Projects Feed</h1>
			<hr className="w-1/3 mb-5" />
			<div className="flex flex-col gap-5 justify-center items-start">
				{projectFeed.map((item, index) => {
					return (
						<div
							key={index}
							className="bg-white m-3 rounded-xl shadow-[rgba(0,0,0,0.1)_0px_15px_20px_0px,rgba(0,0,0,0.04)_0px_10px_10px_-5px] ml-3 p-2 flex gap-3 "
						>
							<div className="left">
								<img className="w-1/2 text-center fit" src={item.coverPhoto} alt="img" />
							</div>
							<div className="right">
								<div className="profile">
									<div className="h-fit w-full flex p-1 justify-start cursor-pointer">
										<img
											className="rounded-full border border-black"
											src={item.owner.profilePhoto}
											alt="pfp not available!"
										/>
										<div className="ml-5 p-1">
											<h2 className="font-semibold text-lg">{item.owner.name}</h2>
											<p className="text-sm opacity-75">{item.owner.branch}</p>
											<h3 className="font-medium">{item.owner.university}</h3>
										</div>
									</div>
								</div>
								<div className="flex flex-col w-full cursor-pointer">
									<h1 className="font-semibold text-lg">{item.title}</h1>
									<p className="w-fit whitespace-normal break-words">{item.description}</p>
									<p className="w-fit font-light text-sm">{item.likes.length} Likes</p>
								</div>
								<div className="flex">
									<button className="w-1/3  px-4 py-2 border border-black font-semibold text-sm bg-zinc-300 hover:bg-slate-300 text-black rounded-bl-md shadow-sm">
										Like
									</button>
									<button className="w-1/3  px-4  py-2 border border-black font-semibold text-sm bg-zinc-300 hover:bg-slate-300 text-black shadow-sm">
										Comment
									</button>
									<button className="w-1/3  px-4 py-2 border border-black font-semibold text-sm bg-zinc-300 hover:bg-slate-300 text-black rounded-br-md shadow-sm">
										Share
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ProjectFeed;
