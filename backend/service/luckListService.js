class LuckListService {
    constructor(LuckListDao) {
        this.LuckListDao = LuckListDao;
    }


   async findMasterNameArrayInPlayAlone() {
    
        const opt = 0 // 0: 혼자하기, 1: 같이하기
        const luckList = await this.LuckListDao.findLuckListByOpt(opt);
        const masterNameArray = luckList.map((luck) => {
           return luck.master_name; 
        });

        return masterNameArray;
    }

    async findIdByNumInPlayAlone(num) {
        const luckIndex = num;
        const opt = 0 // 0: 혼자하기, 1: 같이하기
        const luckList = await this.LuckListDao.findLuckListByOpt(opt);
        const id = luckList[luckIndex].id;

        return id;
    }

    async findMasterNameByNumInPlayAlone(num) {
        const luckIndex = num;
        const opt = 0 // 0: 혼자하기, 1: 같이하기
        const luckList = await this.LuckListDao.findLuckListByOpt(opt);
        const masterName = await luckList[luckIndex].master_name;
        
        return masterName;
    }

    async findLuckByNumInPlayAlone(num) {
        const luckIndex = num;
        const opt = 0 // 0: 혼자하기, 1: 같이하기
        const luckList = await this.LuckListDao.findLuckListByOpt(opt);
        const luck = await luckList[luckIndex].luck;

        return luck;
    }

    async   findSizeOfLuckTypeInPlayAlone() {
        const opt = 0 // 0: 혼자하기, 1: 같이하기
        const luckList = await this.LuckListDao.findLuckListByOpt(opt);
        const size = luckList.length;

        return size;
    }
}

module.exports = LuckListService;