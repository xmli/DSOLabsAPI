export class GuideStarSearchParams {
    constructor(
        public organization_id: number,
        public ein: number,
        public organization_name: string,
        public city: string,
        public state: string,
        public zip: string,
        public participation: string
    ){}
}