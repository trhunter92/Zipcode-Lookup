import * as rp from 'request-promise'
import { GraphQLResolveInfo, GraphQLCompositeType } from 'graphql/type'

type GetZipInfoInput = {
  input: {
    zip: string
    countryCode: string
  }
}

type GetZipInfoResponse = {
  postCode: string
  country: string
  countryAbbreviation: string
  places: [Place]
}

type Place = {
  placeName: String
  longitude: String
  latitude: String
  state: String
  stateAbbreviation: String
}

export const GetZipInfo = async (
  _parent: GraphQLCompositeType,
  args: GetZipInfoInput,
  _context: any,
  _info: GraphQLResolveInfo
): Promise<GetZipInfoResponse> => {
  const { countryCode, zip } = args.input

  try {
    const response = await rp.get(`http://api.zippopotam.us/${countryCode}/${zip}`)
    const parsed = JSON.parse(response)
    console.log(parsed)

    return toGraphqlResponse(parsed)
  } catch (e) {
    console.error(e)
    throw new Error("Oops! Something went wrong. Ensure the zip format matches the country")
  }
}

const toGraphqlResponse = (zipInfo: any): GetZipInfoResponse => ({
  postCode: zipInfo?.["post code"] || "",
  country: zipInfo?.country || "",
  countryAbbreviation: zipInfo?.["country abbreviation"] || "",
  places: zipInfo?.places?.map((place: any) => ({
    placeName: place?.["place name"] || "",
    longitude: place?.longitude || "",
    latitude: place?.latitude || "",
    state: place?.state || "",
    stateAbbreviation: place?.["state abbreviation"] || ""
  }))
})