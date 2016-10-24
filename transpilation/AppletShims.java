public class Size {
	public int width;
	public int height;
}
public class Applet {
	public Size size() { return null; }
	public Image createImage(int x, int y) { return null; }
	public void showStatus(String s) {}
	public void repaint() {}
	public Graphics getGraphics() { return null; }
	public void requestFocus() {}
	public int getWidth() { return 0; }
	public int getHeight() { return 0; }
	public DocumentBase getDocumentBase() { return null; }
	public AppletContext getAppletContext() { return null; }
	public URL getCodeBase() { return null; }
}
public class Color {
	public static Color yellow = null;
	public static Color black = null;
	public static Color red = null;
	public static Color gray = null;
	public static Color white = null;
	public static Color blue = null;
	public static Color green = null;
	public static Color pink = null;
	public static Color cyan = null;
	public static Color lightGray = null;
	public static Color darkGray = null;
	public Color(int r, int g, int b) {}
}
public class Graphics {
	public Font getFont() { return null; }
	public void setFont(Font f) {}
	public void setColor(Color c) {}
	public void fillRect(int x, int y, int w, int h) {}
	public FontMetrics getFontMetrics() { return null; }
	public void drawString(String s, int x, int y) {}
	public void drawImage(Image i, int x, int y, Object o) {}
	public void drawOval(int x, int y, int w, int h) {}
	public void fillOval(int x, int y, int w, int h) {}
	public void fillArc(int x, int y, int w, int h, int s, int e) {}
	public void drawLine(int x, int y, int w, int h) {}
	public void fillPolygon(int[] xs, int[] ys, int n) {}
	public void fillPolygon(Polygon p) {}
	public void drawArc(int x, int y, int w, int h, int s, int e) {}
}
public class Image {
	public Graphics getGraphics() { return null; }
}
public class Event {
	public int id;
	public int x;
	public int y;
	public int key;
	public Button target;
	public static final int KEY_ACTION = 0;
	public static final int LEFT = 1;
	public static final int RIGHT = 2;
	public static final int UP = 3;
	public static final int DOWN = 4;
	public static final int KEY_ACTION_RELEASE = 5;
}
public class Font {
	public String getName() { return null; }
	public Font(String name, int w, int h) {}
}
public class FontMetrics {
	public int getHeight() { return 0; }
	public int stringWidth(String s) { return 0; }
	public int getAscent() { return 0; }
}
public class Thread {
    public static void sleep(long ms) {}
    public Thread(Runnable r) {}
    public void start() {}
    public void stop() {}
}
public interface Runnable {}

public class AppletContext {
	public void showDocument(URL u, String s) {}
}
public class DocumentBase {
	public String getHost() { return null; }
}
public class URL { 
	public URL(String s) {}
	public InputStream openStream() { return null; }
}
public class PrintStream {
	public Object print(Object s) { return null; }
	public Object println() { return null; }
	public Object println(Object s) { return null; }
}
public class System {
	public static PrintStream out = null;
	public static long currentTimeMillis() { return 0L; }
}
public class BufferedImage extends Image {
	public BufferedImage(int x, int y, int z) {}
	public BufferedImage getSubimage(int a, int b, int c, int d) { return null; }
}
public class Vector {
	public Vector(int n) {}
	public void removeAllElements() {}
	public Object get(int i) { return null; }
	public int size() { return 0; }
	public void add(int[] x) {}
}
public class Element {
	public void add(Element e) {}
}
public class Frame extends Element {
	public void setTitle(String s) {}
	public void pack() {}
	public void show() {}
	public void dispose() {}
	public void setLayout(GridLayout g) {}
}
public class TextField extends Element {
	public TextField(int s) {}
	public String getText() { return null; }
}
public class Button extends Element {
	public Button(String s) {}
}
public class Polygon {
	public Polygon(int[] xs, int[] ys, int n) {}
}
public class InputStream {
	public void close() {}
}
public class BufferedReader {
	public BufferedReader(InputStreamReader i) {}
	public String readLine() { return null; }
	public void close() {}
}
public class InputStreamReader {
	public InputStreamReader(InputStream is) {}
}
public class Panel extends Element {
}
public class Label extends Element {
	public Label(String s) {}
}
public class GridLayout {
	public GridLayout(int x, int y) {}
}
public class Long {
	public static long parseLong(String s) { return 0L; }
}
public class Chars {
	public static int[] charCodeArray(String s) {
		char[] chars = s.toCharArray(/*comment to stop this being modified*/);
		int[] arr = new  int  [chars.length];
		for (int i = 0; i < chars.length; i++) {
			arr[i] = chars[i] - 'a' + 'a';
		}
		return arr;
	}
}