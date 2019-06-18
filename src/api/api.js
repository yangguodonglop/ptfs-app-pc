import axios from 'axios';

let base = '';
//let ownbase='http://47.99.193.140:8084'//服务器接口
//let ownbase='http://192.168.0.182:9999'//本地接口
let ownbase = 'http://47.99.193.140' //外网接口
    //let ownbase = 'http://test.zzb.com' //内网接口


export default {
    customData: function() {
        return ownbase;
    }

}



export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };


//新增

//登录
export const requestLoginOwn = params => { return axios.post(`${ownbaselogin}`, params).then(res => res.data); };

//	在线节点数
export const queryOnlineNodeHistgraphs = params => { return axios.post(`${ownbase}/overview/queryOnlineNodeHistgraph`, params).then(res => res.data); };
//实际存储数据量
export const queryStoreUsageHistgraph = params => { return axios.post(`${ownbase}/overview/queryStoreUsageHistgraph`, params).then(res => res.data); };

//tilte显示数量
export const querySummary = params => { return axios.post(`${ownbase}/overview/querySummary`, params).then(res => res.data); };

//存储量/存储空间  
export const queryDevStoreHistgraph = params => { return axios.post(`${ownbase}/overview/queryDevStoreHistgraph`, params).then(res => res.data); };
//存储文件数

export const queryFileCntHistgraph = params => { return axios.post(`${ownbase}/overview/queryFileCntHistgraph`, params).then(res => res.data); };
//文件查询
export const queryFileSummaryByConditions = params => { return axios.post(`${ownbase}/PTFSFileManage/queryFileSummaryByConditions`, params).then(res => res.data); };

//文件查看详情
export const queryOneFileBackupOwnerRecords = params => { return axios.post(`${ownbase}/PTFSFileManage/queryOneFileBackupOwnerRecords`, params).then(res => res.data); };

//黑名单查询
export const queryBlackListByCondition = params => { return axios.post(`${ownbase}/PTFSFileManage/queryBlackListByCondition`, params).then(res => res.data); };

//文件查看详情删除
export const deleteFileList = params => { return axios.post(`${ownbase}/PTFSFileManage/deleteFileList`, params).then(res => res.data); };
//文件查看备份
export const backupFileByCondition = params => { return axios.post(`${ownbase}/PTFSFileManage/backupFileByCondition`, params).then(res => res.data); };

//黑名单添加
export const addNewForbiddenFile = params => { return axios.post(`${ownbase}/PTFSFileManage/addNewForbiddenFile`, params).then(res => res.data); };

//黑名单批量添加
export const uploadBlackListFile = params => { return axios.post(`${ownbase}/PTFSFileManage/uploadBlackListFile`, params).then(res => res.data); };

//黑名单删除
export const updateBlackListFile = params => { return axios.post(`${ownbase}/PTFSFileManage/updateBlackListFile`, params).then(res => res.data); };

//地图节点查询
export const queryMinerGeographDist = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryMinerGeographDist`, params).then(res => res.data); };

//页面加载进来节点详细信息
export const queryOneCityMinerDistDetails = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryOneCityMinerDistDetails`, params).then(res => res.data); };
export const queryAllNodeProfiesByNodeTypes = params => { return axios.post(`${ownbase}/overview/queryAllNodeProfiesByNodeTypes`, params).then(res => res.data); };




//单个节点详细信息
export const queryNodeStoredFileListByNodeId = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryNodeStoredFileListByNodeId`, params).then(res => res.data); };

//单个节点概览信息查询
export const queryNodeInfoById = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryNodeInfoById`, params).then(res => res.data); };

//修改节点配置
export const queryAllConfigRecords = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryAllConfigRecords`, params).then(res => res.data); };

//新增节点配置更新
export const updateNodeConfig = params => { return axios.post(`${ownbase}/PTFSFileManage/updateNodeConfig`, params).then(res => res.data); };

//更新节点配置上传
//export const updateNodeConfig= params => { return axios.post(`${ownbase}/PTFSFileManage/updateNodeConfig`, params).then(res => res.data); };

//分区分组信息展示
export const queryRegionGroupInfo = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryRegionGroupInfo`, params).then(res => res.data); };
//分区分组点击组数查看i详情
export const queryGroupInfo = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryGroupInfo`, params).then(res => res.data); };

//缓存，备份更新后
export const queryAllNodesProfiles = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryAllNodesProfiles`, params).then(res => res.data); };

//日志查看
export const showNodeNetworkLogs = params => { return axios.post(`${ownbase}/PTFSLogSys/showNodeNetworkLogs`, params).then(res => res.data); };
//日志类型数据获取
export const queryLogTypes = params => { return axios.get(`${ownbase}/PTFSLogSys/queryLogTypes`, params).then(res => res.data); };
//删除要清空的日志列表
export const deleteHistoryDatas = params => { return axios.post(`${ownbase}/PTFSLogSys/deleteHistoryDatas`, params).then(res => res.data); };









//西柚机系统管理
//测试文件上传
export const updateNodeConfigtest = params => { return axios.post(`${ownbase}/admin/upload`, params).then(res => res.data); };
//系统管理获取数据列表
export const queryRom = params => { return axios.post(`${ownbase}/overview/queryRom`, params).then(res => res.data); };
//系统管理确定上传保存数据
export const saveRom = params => { return axios.post(`${ownbase}/overview/saveRom`, params).then(res => res.data); };
//系统管理删除数据
export const deleteRom = params => { return axios.post(`${ownbase}/overview/deleteRom`, params).then(res => res.data); };
//修改包数据查询单条数据信息
export const findRomById = params => { return axios.post(`${ownbase}/overview/findRomById`, params).then(res => res.data); };
//修改包数据确定修改
export const updateRom = params => { return axios.post(`${ownbase}/overview/updateRom`, params).then(res => res.data); };
//发布查询要发布版本的信息
export const getpacketbyversion = params => { return axios.post(`${ownbase}/overview/getpacketbyversion`, params).then(res => res.data); };
//确定发布
export const publish = params => { return axios.post(`${ownbase}/overview/publish`, params).then(res => res.data); };
//发布方式修改
export const updateMod = params => { return axios.post(`${ownbase}/overview/updateMod`, params).then(res => res.data); };
//发布版本列表
export const publishlist = params => { return axios.post(`${ownbase}/overview/publishlist`, params).then(res => res.data); };
//获取版本号列表
export const getversion = params => { return axios.post(`${ownbase}/overview/getversion`, params).then(res => res.data); };


//西柚机应用管理
//西柚机应用管理上传
export const saveapp = params => { return axios.post(`${ownbase}/app/saveapp`, params).then(res => res.data); };
//应用管理查询列表
export const applist = params => { return axios.post(`${ownbase}/app/applist`, params).then(res => res.data); };
//应用发布管理查询列表
export const appdevicelist = params => { return axios.post(`${ownbase}/app/devicelist`, params).then(res => res.data); };

//西柚机设备信息
export const devicelist = params => { return axios.post(`${ownbase}/device/devicelist`, params).then(res => res.data); };