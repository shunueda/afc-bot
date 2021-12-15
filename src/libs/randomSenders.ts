export interface RandomSender {
	username: string
	avatarURL: string
}

const randomSenders: RandomSender[] = [
	{
		username: 'Bernice Wong',
		avatarURL:
			'https://scontent-lga3-2.cdninstagram.com/v/t51.2885-19/s150x150/217335886_986731358794373_6632112279176355908_n.jpg?_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=wHBsO3Q3a8YAX9Czi_5&edm=ABfd0MgBAAAA&ccb=7-4&oh=c5b6b29b1ce3c8ce409295e350e06d38&oe=61A3D1C3&_nc_sid=7bff83'
	},
	{
		username: 'Andy Lau',
		avatarURL:
			'https://cdn.discordapp.com/attachments/718050872663212086/912888704975118356/unknown.png'
	},
	{
		username: 'Hamza Ali',
		avatarURL:
			'https://media-exp1.licdn.com/dms/image/C4E03AQFHIb3vc_astA/profile-displayphoto-shrink_800_800/0/1612321860355?e=1643241600&v=beta&t=se56EbDRGCCCEr_886gqr5mcyLSP0r_DooLHMCOpkkY'
	}
]

export default randomSenders
