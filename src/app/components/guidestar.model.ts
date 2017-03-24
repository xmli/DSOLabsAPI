export class GuideStarOrg {
    constructor(
        public organization_id: number,
        public ein: number,
        public organization_name: string,
        public address_line1: string,
        public address_line2: string,
        public city: string,
        public state: string,
        public zip: string,
        public mission: string
    ){}
}