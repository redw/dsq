/**
 * 几何学工具
 * @author j
 *
 */
var GeomUtil;
(function (GeomUtil) {
    /**
     * 弧度转角度乘值
     */
    var R_T_D = 180 / Math.PI;
    /**
     * 角度转弧度乘值
     */
    var D_T_R = Math.PI / 180;
    /**
     * 弧度转角度
     * @param radians
     * @return
     *
     */
    function radiansToDegrees(radians) {
        return radians * R_T_D;
    }
    GeomUtil.radiansToDegrees = radiansToDegrees;
    /**
     * 角度转弧度
     * @param degrees
     * @return
     *
     */
    function degreesToRadians(degrees) {
        return degrees * D_T_R;
    }
    GeomUtil.degreesToRadians = degreesToRadians;
    /**
     * 两点间的角度
     * @param p_1
     * @param p_2
     * @return
     *
     */
    function pointAngle(p_1, p_2) {
        return Math.atan2(p_2.y - p_1.y, p_2.x - p_1.x) * R_T_D;
    }
    GeomUtil.pointAngle = pointAngle;
    /**
     * 两点间的弧度
     * @param p1
     * @param p2
     * @return
     *
     */
    function pointRadians(p_1, p_2) {
        return Math.atan2(p_2.y - p_1.y, p_2.x - p_1.x);
    }
    GeomUtil.pointRadians = pointRadians;
    /**
     * 角度转为角速度
     * @param angle
     * @return
     *
     */
    function angleToSpeed(angle) {
        var radians = angle * D_T_R;
        return new egret.Point(Math.cos(radians), Math.sin(radians));
    }
    GeomUtil.angleToSpeed = angleToSpeed;
    /**
     * 弧度转为角速度
     * @param angle
     * @return
     *
     */
    function radiansToSpeed(radians) {
        return new egret.Point(Math.cos(radians), Math.sin(radians));
    }
    GeomUtil.radiansToSpeed = radiansToSpeed;
    /**
     * 两点间的角速度
     * @param p_1
     * @param p_2
     * @return
     *
     */
    function angleSpeed(p_1, p_2) {
        var radians = Math.atan2(p_2.y - p_1.y, p_2.x - p_1.x);
        return new egret.Point(Math.cos(radians), Math.sin(radians));
    }
    GeomUtil.angleSpeed = angleSpeed;
    /**
     * 获取以原始点为中心的圆圈上的一个点（正向运动基础算法）
     * @param p 原始点
     * @param angle 角度
     * @param length 与当前点之间的长度
     * @return
     *
     */
    function getCirclePoint(point, angle, length) {
        var radians = angle * D_T_R;
        return point.add(new egret.Point(Math.cos(radians) * length, Math.sin(radians) * length));
    }
    GeomUtil.getCirclePoint = getCirclePoint;
    /**
     * 获取以原始点为中心的圆圈上的一个点（正向运动基础算法）
     * @param p 原始点
     * @param radians 弧度
     * @param length 与当前点之间的长度
     * @return
     *
     */
    function getCirclePoint2(point, radians, length) {
        return point.add(new egret.Point(Math.cos(radians) * length, Math.sin(radians) * length));
    }
    GeomUtil.getCirclePoint2 = getCirclePoint2;
    /**
     * 获取贝塞尔曲线Y坐标
     * @param x X坐标（0-1）
     * @param startY 初始Y坐标（0-1）
     * @return
     *
     */
    function getBezierY(x, startY) {
        if (startY === void 0) { startY = 0; }
        if (x < 0 || x > 1) {
            return 0;
        }
        else if (startY < 0 || startY > 1) {
            return 0;
        }
        else {
            var startX = 0.5 - Math.sqrt((1 - startY) / 4);
            var currentX = x * (1 - startX) + startX;
            return 4 * (currentX - 0.5) * (currentX - 0.5) - 1;
        }
    }
    GeomUtil.getBezierY = getBezierY;
    /**
     * 获取线段ab，cd是否相交
     * @param a
     * @param b
     * @param c
     * @param d
     * @return
     *
     */
    function getLineAcross(a, b, c, d) {
        if (a == null || b == null || c == null || d == null) {
            return false;
        }
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
        if (area_abc * area_abd > 0) {
            return false;
        }
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        var area_cdb = (c.x - b.x) * (d.y - b.y) - (c.y - b.y) * (d.x - b.x);
        if (area_cda * area_cdb > 0) {
            return false;
        }
        return true;
    }
    GeomUtil.getLineAcross = getLineAcross;
    /**
     * 获取线段ab，cd的相交点
     * @param a
     * @param b
     * @param c
     * @param d
     * @return
     *
     */
    function getLineAcrossPoint(a, b, c, d) {
        if (a == null || b == null || c == null || d == null) {
            return null;
        }
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
        if (area_abc * area_abd > 0) {
            return null;
        }
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        var area_cdb = (c.x - b.x) * (d.y - b.y) - (c.y - b.y) * (d.x - b.x);
        if (area_cda * area_cdb > 0) {
            return null;
        }
        var t = area_cda / (area_abd - area_abc);
        var dx = t * (b.x - a.x);
        var dy = t * (b.y - a.y);
        return new egret.Point(a.x + dx, a.y + dy);
    }
    GeomUtil.getLineAcrossPoint = getLineAcrossPoint;
    /**
     * 点是否在quad内,注意一家要是凸四边形
     * @param point
     * @param A
     * @param B
     * @param C
     * @param D
     * @returns {boolean}
     */
    function isPointInQuad(point, A, B, C, D) {
        if (!point || !A || !B || !C || !D) {
            return null;
        }
        var x = point.x;
        var y = point.y;
        var a = (B.x - A.x) * (y - A.y) - (B.y - A.y) * (x - A.x);
        var b = (C.x - B.x) * (y - B.y) - (C.y - B.y) * (x - B.x);
        var c = (D.x - C.x) * (y - C.y) - (D.y - C.y) * (x - C.x);
        var d = (A.x - D.x) * (y - D.y) - (A.y - D.y) * (x - D.x);
        if ((a > 0 && b > 0 && c > 0 && d > 0) || (a < 0 && b < 0 && c < 0 && d < 0)) {
            return true;
        }
        return false;
    }
    GeomUtil.isPointInQuad = isPointInQuad;
})(GeomUtil || (GeomUtil = {}));
