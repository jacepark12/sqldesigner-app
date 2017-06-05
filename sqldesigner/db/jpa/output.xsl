<?xml version="1.0" encoding="us-ascii"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="text"/>

    <!-- Return length of element-->
    <xsl:template name="getsize">
        <xsl:param name="invalue"/>
        <xsl:choose>
            <xsl:when test="contains($invalue,'(')">
                <xsl:variable name="part" select="substring-after($invalue,'(')"/>
                <xsl:value-of select="substring-before($part,')')"/>
            </xsl:when>
        </xsl:choose>
    </xsl:template>

    <!-- This is the root of output -->
    <xsl:template match="/sql">
        <!--<xsl:text>db_engine = sa.create_engine('sqlite:///db.sqlite')&#xa;</xsl:text>
        <xsl:text>metadata = sa.MetaData()&#xa;</xsl:text>
        <xsl:apply-templates select="table" />
        <xsl:text>&#xa;</xsl:text>-->

        <!-- Construct the mapping objects -->
        <xsl:text>//Entity class</xsl:text>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>&#xa;</xsl:text>


        <xsl:for-each select="table">
            <xsl:apply-templates select="comment"/>
            <xsl:text>@Entity</xsl:text>
            <xsl:text>&#xa;</xsl:text>
            <xsl:text>@Table(name ="</xsl:text>
            <xsl:value-of select="@name"/>
            <xsl:text>" )</xsl:text>
            <xsl:text>&#xa;</xsl:text>
            <xsl:text>public class </xsl:text>
            <xsl:value-of select="@name"/>
            <xsl:text>{&#xa;</xsl:text>     
                    <xsl:apply-templates select="row"/>
            <xsl:text>}&#xa;</xsl:text>
            <xsl:text>&#xa;</xsl:text>
        </xsl:for-each>

        <!-- Mapping the tables to the objects -->
        <xsl:text>&#xa;&#xa;# Declare mappings</xsl:text>

        <xsl:for-each select="table">
            <xsl:text>&#xa;mapper(</xsl:text>
            <xsl:value-of select="@name"/>
            <xsl:text>, </xsl:text>
            <xsl:value-of select="@name"/>
            <xsl:text>_table)</xsl:text>
        </xsl:for-each>

        <!-- Create a session to manage the objects -->
        <xsl:text>&#xa;&#xa;# Create a session</xsl:text>
        <xsl:text>&#xa;session = sessionmaker(bind=db_engine)&#xa;</xsl:text>

    </xsl:template>

    <!-- What a Table look like -->
    <xsl:template match="table">
        <xsl:variable name="keys" select="''" />
        <!-- First place the header -->
        <xsl:text>&#xa;</xsl:text> <!-- Newline -->
        <xsl:text>&#xa;# Table definition - </xsl:text><xsl:value-of select="@name"/>
        <xsl:text>&#xa;# </xsl:text><xsl:value-of select="./comment"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:value-of select="@name"/>
        <xsl:text>_table = sa.Table("</xsl:text>
        <xsl:value-of select="@name"/>
        <xsl:text>", metadata,</xsl:text>
        <!-- Next iterate over the Columns -->
        <xsl:apply-templates select="row"/>
        <!-- Finish the table -->
        <xsl:text>)</xsl:text>
    </xsl:template>

    <xsl:template match="row">
        <xsl:text>&#xa;</xsl:text> <!-- Newline -->
        <xsl:if test="comment">
            <xsl:text>    </xsl:text> <!-- Pretty indentation -->
        </xsl:if>
        <xsl:apply-templates select="comment"/>
        <!--<xsl:for-each select="../key[@type='PRIMARY']/part">
            <xsl:if test="$rowname = text()">@Id</xsl:if>
        </xsl:for-each>-->
        <!--start of annotation -->
        <xsl:if test="@autoincrement='1'">
                <xsl:text>        @GeneratedValue</xsl:text>
                <xsl:text>&#xa;</xsl:text>
        </xsl:if>
        <xsl:text>        @Column(name="</xsl:text>
        <xsl:value-of select="@name"/>
        <xsl:choose>
        <xsl:when test="@null='1'">
            <xsl:text>, nullable=true</xsl:text>
        </xsl:when>
        <xsl:otherwise>
            <xsl:text>, nullable=false</xsl:text>
        </xsl:otherwise>
        </xsl:choose>
        <xsl:apply-templates select="relation"/>
        <xsl:text>" )</xsl:text>
        <!--end of annotation -->
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>        </xsl:text>
        <xsl:apply-templates select="datatype"/>
        <xsl:value-of select="@name"/>
        <xsl:text>;</xsl:text>
        <xsl:text>&#xa;</xsl:text>
    </xsl:template>

    <xsl:template match="datatype">
        <xsl:value-of select="."/>
        <xsl:text> </xsl:text>
    </xsl:template>

    <xsl:template match="relation">
        <xsl:text>, sa.ForeignKey("</xsl:text>
        <xsl:value-of select="@table" />
        <xsl:text>.</xsl:text>
        <xsl:value-of select="@row" />
        <xsl:text>")</xsl:text>
    </xsl:template>

    <xsl:template match="comment">
        <xsl:text>// </xsl:text>
        <xsl:value-of select="../@name"/>
        <xsl:text> - </xsl:text>
        <xsl:value-of select="." />
        <xsl:text>&#xa;</xsl:text>
    </xsl:template>

</xsl:stylesheet>
