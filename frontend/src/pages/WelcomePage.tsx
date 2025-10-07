import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Button from "@/components/Button"

interface WelcomePageProps {
    userName?: string
    onStartFromScratch?: () => void
    onUploadPDF?: () => void
}

const WelcomePage = ({
    userName = "User",
    onStartFromScratch,
    onUploadPDF
}: WelcomePageProps) => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#A07CFF] to-[#6D83F2] text-transparent bg-clip-text">
                        Welcome {userName}!
                    </h1>
                    <p className="text-xl text-gray-700">
                        What would you like to do?
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="bg-gray-100 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-xl font-bold text-gray-900">
                                Start from scratch
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                            <CardDescription className="text-gray-700 text-base leading-relaxed">
                                Don't have a starting PDF? Answer our questions and have your new project proposal PDF generated.
                            </CardDescription>
                            <div className="pt-2">
                                <Button
                                    label="Form"
                                    onClick={onStartFromScratch}
                                    className="px-8 py-3 rounded-lg text-lg font-semibold"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-100 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="text-center pb-4">
                            <CardTitle className="text-xl font-bold text-gray-900">
                                Upload a PDF
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                            <CardDescription className="text-gray-700 text-base leading-relaxed">
                                Already have a project proposal PDF? Get it checked and refined!
                            </CardDescription>
                            <div className="pt-2">
                                <Button
                                    label="Upload"
                                    onClick={onUploadPDF}
                                    className="px-8 py-3 rounded-lg text-lg font-semibold"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
